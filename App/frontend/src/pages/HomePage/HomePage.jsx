import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Flame, Plus, TrendingUp } from "lucide-react";
import BaseLayout from "../../Layout/BaseLayout";
import SnippetCard from "../../components/SnippetCard/SnippetCard";
import {
  MyCard,
  MyCardHeader,
  MyCardTitle,
  MyCardContent,
} from "../../components/MyCard/MyCard";
import MyButton from "../../components/MyButton/MyButton";
import "./HomePage.css";

const trendingTags = [
  { tag: "react", count: "12.4k" },
  { tag: "typescript", count: "9.8k" },
  { tag: "python", count: "7.1k" },
  { tag: "sql", count: "4.3k" },
  { tag: "tailwind", count: "3.9k" },
  { tag: "rust", count: "2.2k" },
];

const filters = ["Trending", "Newest", "Most Forked"];

const HomePage = () => {
  return (
    <BaseLayout>
      <Container className="py-4 py-md-5">
        <Row className="g-4">
          <Col xs={12} lg={8}>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex flex-column">
                  <h1 className="feed-title m-0">Your Feed</h1>
                  <p className="feed-subtitle m-0">
                    Fresh snippets from developers.
                  </p>
                </div>
                <MyButton className="d-md-none px-3 py-1">
                  <Plus size={16} /> New
                </MyButton>
              </div>

              <div className="filters-container">
                {filters.map((filter, i) => (
                  <button
                    key={filter}
                    type="button"
                    className={`filter-pill ${i === 0 ? "active" : ""}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="d-flex flex-column gap-4">
                {[1, 2].map((id) => (
                  <SnippetCard key={id} />
                ))}
              </div>
            </div>
          </Col>

          <Col lg={4} className="d-none d-lg-flex flex-column gap-4">
            <MyCard>
              <MyCardHeader>
                <MyCardTitle className="aside-card-title d-flex align-items-center gap-2">
                  <TrendingUp size={16} className="text-primary-custom" />
                  Trending Tags
                </MyCardTitle>
              </MyCardHeader>
              <MyCardContent className="d-flex flex-wrap gap-2">
                {trendingTags.map(({ tag, count }) => (
                  <div key={tag} className="trending-badge">
                    #{tag}
                    <span className="trending-count">{count}</span>
                  </div>
                ))}
              </MyCardContent>
            </MyCard>

            <MyCard>
              <MyCardHeader>
                <MyCardTitle className="aside-card-title d-flex align-items-center gap-2">
                  <Flame size={16} className="text-primary-custom" />
                  Snippet of the Day
                </MyCardTitle>
              </MyCardHeader>
              <MyCardContent className="aside-card-content d-flex flex-column gap-2">
                <Link to="/snippet/cn-util" className="snippet-day-link">
                  clear_cache — clear Android's cache
                </Link>
                <p className="m-0 text-secondary">
                  The most forked utility this week with 214 forks and counting.
                </p>
              </MyCardContent>
            </MyCard>

            <p className="aside-footer-text px-1 m-0">
              SnippetVault · Share, explore, and fork code with developers
              worldwide.
            </p>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default HomePage;
