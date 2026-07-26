import {
  BookmarkIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Tool from "../components/Tool";
import { useAuth } from "../hooks/useAuth";
import { useModal } from "../hooks/useModal";
import { ModalType } from "../types/modal";
import type { UserProfile } from "../types/user";

type Props = {
  summary: UserProfile;
};

function ProfileToolbar({ summary }: Props) {
  const { user } = useAuth();
  const { openModal } = useModal();

  function handleCreateListModal() {
    if (!user) return;
    openModal(ModalType.CREATE_LIST);
  }

  const toolbar = [
    { name: "Films", icon: BookmarkIcon, handler: () => {} },
    { name: "Create", icon: PlusIcon, handler: handleCreateListModal },
    { name: "Edit", icon: PencilIcon, handler: () => {} },
    { name: "More", icon: EllipsisHorizontalIcon, handler: () => {} },
  ];

  return (
    <div className="flex items-center gap-4">
      {toolbar.map((tool) => (
        <Tool key={tool.name} tool={tool} />
      ))}
    </div>
  );
}

export default ProfileToolbar;
