import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateListSchema,
  type CreateList,
} from "../../../utils/validation/create-list";
import { useAuth } from "../../hooks/useAuth";
import { useCreateList } from "../../hooks/useCreateList";
import { useModal } from "../../hooks/useModal";
import Button from "../Button";

function CreateList() {
  const { user } = useAuth();
  const { stopPropagation, closeModal } = useModal();

  const createListMutation = useCreateList(user?.uid);

  const form = useForm<CreateList>({
    resolver: zodResolver(CreateListSchema),
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmitForm(input: CreateList) {
    try {
      createListMutation.mutate(input);
    } catch (error) {
      console.log("error in creation");
      console.error(error);
    }
  }
  return (
    <div
      className="relative panel grid grid-rows-[auto_1fr] gap-4 w-76 h-100"
      onClick={stopPropagation}
    >
      <header className="flex flex-col gap-4">
        <p className="text-xs text-center">Create List</p>
        {/* 
        {collectionPayload?.film && (
          <p className="text-sm p-2 rounded-xl bg-red-700 text-white font-medium">
            Adding {collectionPayload.film.title}
          </p>
        )} */}

        {errors.root && (
          <p className="py-1 input-error">{errors.root.message}</p>
        )}
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        {/* name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="form-label ">
            List Name
          </label>

          <input
            {...register("name")}
            className="input h-9"
            placeholder="comfort rewatches"
          />

          <p className="input-error">{errors.name?.message}</p>
        </div>

        {/* description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="form-label">
            Description (Optional)
          </label>

          <textarea
            {...register("description")}
            className="input h-20 resize-none"
            placeholder="movies i throw on when my brain is tired"
          ></textarea>

          <p className="input-error">{errors.description?.message}</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isPrivate")}
            id="private"
            className="size-4 accent-black"
          />

          <label htmlFor="private" className="text-sm h-full mt-0!">
            Is this list private?
          </label>

          <p className="input-error">{errors.isPrivate?.message}</p>
        </div>

        <div className="h-16 w-full p-4 flex items-center justify-end gap-4 border-t border-gray-50 shadow-xs absolute bottom-0 left-0 bg-white z-10">
          <Button onClick={closeModal}>Cancel</Button>

          <Button
            disabled={createListMutation.isPending}
            type="submit"
            className="bg-neutral-800 text-white"
          >
            {createListMutation.isPending ? "Creating..." : "Create List"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateList;
