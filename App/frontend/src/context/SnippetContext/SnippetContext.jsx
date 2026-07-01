import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../AuthContext/AuthContext";
import SnippetForm from "../../components/SnippetForm/SnippetForm";

export const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);

  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const fetchSnippets = useCallback(async () => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/snippets/all?sort=${activeFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 401) {
        logoutUser();
        return;
      }
      if (!response.ok) throw new Error("Unable to retrieve data");

      const data = await response.json();
      setSnippets(data.allSnippets);
    } catch (error) {
      console.error(error);
      setError("Oops! Something went wrong while loading the feed.");
    }
  }, [activeFilter, logoutUser]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchSnippets();
    }
  }, [isLoggedIn, fetchSnippets]);

  const handleCreateSnippet = async (formData) => {
    setIsCreating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/snippets/new`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.status === 401) {
        logoutUser();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create snippet.");
      }

      setShowModal(false);
      await fetchSnippets();
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong...");
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditSnippet = async (formData, snippetId) => {
    setIsCreating(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/snippets/edit/${snippetId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.status === 401) {
        logoutUser();
        return;
      }

      if (!response.ok) throw new Error("Failed to edit snippet.");
      setShowModal(false);
      setEditingSnippet(null);
      await fetchSnippets();
    } catch (error) {
      console.warn(error);
      alert(error.message || "Something went wrong while editing...");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteSnippet = async (snippetId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/snippets/delete/${snippetId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        logoutUser();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete snippet.");
      }

      setSnippets((prevSnippets) =>
        prevSnippets.filter((snippet) => snippet._id !== snippetId),
      );
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong while deleting...");
    }
  };

  const value = {
    snippets,
    error,
    activeFilter,
    setActiveFilter,
    openModal: (snippetData = null) => {
      setEditingSnippet(snippetData);
      setShowModal(true);
    },
    closeModal: () => {
      setShowModal(false);
      setEditingSnippet(null);
    },
    handleDeleteSnippet,
    handleEditSnippet,
  };

  return (
    <SnippetContext.Provider value={value}>
      {children}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        contentClassName="bg-transparent border-0"
      >
        <Modal.Body className="p-0">
          <SnippetForm
            initialData={editingSnippet}
            onSubmit={(formData) =>
              editingSnippet
                ? handleEditSnippet(formData, editingSnippet._id)
                : handleCreateSnippet(formData)
            }
            isLoading={isCreating}
            onCancel={() => {
              setShowModal(false);
              setEditingSnippet(null);
            }}
          />
        </Modal.Body>
      </Modal>
    </SnippetContext.Provider>
  );
};
