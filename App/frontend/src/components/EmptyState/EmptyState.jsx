import { Inbox, Plus } from "lucide-react";
import { MyCard, MyCardContent, MyCardTitle } from "../MyCard/MyCard";
import { useContext } from "react";
import MyButton from "../MyButton/MyButton";
import "./EmptyState.css";
import { SnippetContext } from "../../context/SnippetContext/SnippetContext";
const EmptyState = () => {
  const { openModal } = useContext(SnippetContext);
  return (
    <MyCard className="empty-feed-card py-5 mt-2 text-center">
      <MyCardContent className="d-flex flex-column align-items-center gap-3">
        <Inbox size={48} className="empty-icon mb-2" />
        <MyCardTitle className="empty-title">No snippets found</MyCardTitle>
        <p className="empty-subtitle m-0 mb-3">
          Be the first to share a snippet with the community!
        </p>
        <MyButton onClick={() => openModal()}>
          <Plus size={16} /> Create Snippet
        </MyButton>
      </MyCardContent>
    </MyCard>
  );
};

export default EmptyState;
