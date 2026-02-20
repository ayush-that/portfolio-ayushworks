import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchFunc } from "~/lib/axios";
import { contactSchemaType } from "~/schema";

export const useSendContactData = () =>
  useMutation({
    mutationFn: (data: contactSchemaType) => fetchFunc("/contact", { method: "POST", data }),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("I'll be in touch shortly."),
  });
