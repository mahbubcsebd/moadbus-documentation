import AskAIButton from "./AskAIButton";
import SearchTriggerButton from "./SearchTriggerButton";

export default function HeaderSearch() {
  return (
    <div className="docs-search-cluster">
      <SearchTriggerButton />
      <AskAIButton />
    </div>
  );
}
