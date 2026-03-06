import { PageHeader } from "@/components/shared/page-header";
import { PostSkillsForm } from "@/components/forms/post-skills-form";

export default function PostPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <PageHeader
        title="Post Your Skills"
        description="Let others know what you bring to the table"
      />
      <PostSkillsForm />
    </div>
  );
}
