"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import config from "~/config";
import { ContactSchema, contactSchemaType } from "~/schema";
import { CustomLink } from "./mdx";
import Socials from "./socials";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { typo } from "./ui/typograpghy";
import { useState } from "react";
import { toast } from "sonner";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<contactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: contactSchemaType) {
    try {
      setIsSubmitting(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c90e41df-71f6-438d-a957-dd005e2828d4",
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Thank you for contacting me!");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section aria-label="contact" className="!mt-5">
      <div className="flex items-center flex-col md:flex-row w-full gap-4">
        <div className="md:max-w-xs size-full space-y-4 ">
          <h2 className={typo({ variant: "h2" })}>Get in Touch</h2>
          <p className="text-muted-foreground text-base">
            If you have any inquiries, please feel free to reach out. You can
            contact us via email at{" "}
            <CustomLink
              href={`mailto:${config.social.email}`}
              aria-label={config.social.email}
            >
              {config.social.email}
            </CustomLink>{" "}
          </p>

          <div className="space-y-3">
            <h3>Follow me </h3>
            <Socials />
          </div>
        </div>

        <Form {...form}>
          <form
            className="bg-[#131313] p-3 rounded-md sm:rounded-none sm:p-0 sm:bg-transparent space-y-3 sm:space-y-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h2 className="text-center text-lg font-ubuntu block sm:hidden">
              Fill this form
            </h2>
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        className="normal-case"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Phone No"
                        className="normal-case"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="normal-case"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Message"
                      className="normal-case"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactUs;
