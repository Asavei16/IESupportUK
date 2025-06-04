import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { insertApplicationSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FileInput } from "@/components/ui/file-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

// Extend the application schema with client-side validation
const applicationFormSchema = insertApplicationSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  earliestStartDate: z.string().min(1, "This field is required"),
  preferredInterviewDate: z.string().min(1, "This field is required"),
  settleStatus: z.string().min(1, "This field is required"),
  englishLevel: z.string().min(1, "This field is required"),
  nationality: z.string().min(1, "This field is required"),
  // Override these to be string since we're using form data
  employed: z.union([z.boolean(), z.literal("true"), z.literal("false")]).transform(val => {
    if (typeof val === 'string') {
      return val === 'true';
    }
    return val;
  }), 
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const ApplicationForm = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      earliestStartDate: "",
      preferredInterviewDate: "",
      settleStatus: "",
      englishLevel: "Intermediate",
      employed: false,
      nationality: "", 
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ApplicationFormValues) => {
      const formData = new FormData();
      
      // Add text fields to form data
      // Object.entries(values).forEach(([key, value]) => {
      //   if (key !== "documents" && value !== undefined) {
      //     formData.append(key, String(value));
      //   }
      // });
      
      // // Add files to form data
      // files.forEach((file) => {
      //   formData.append("documents", file);
      // });
      
      // const response = await fetch("/api/applications", {
      //   method: "POST",
      //   body: formData,
      //   // Don't set Content-Type header, it will be automatically set with boundary
      //   credentials: "include",
      // });
      const response = await fetch("/send_application.php", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }
      
      // return await response.json();
      return await response.text();
    },
    onSuccess: () => {
      toast({
        title: "Application submitted successfully",
        description: "We'll contact you soon regarding your application.",
      });
      form.reset();
      setFiles([]);
    },
    onError: (error) => {
      toast({
        title: "Error submitting application",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: ApplicationFormValues) => {    
    mutation.mutate(values);
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">{t("application.title")}</h1>
            <p className="text-gray-600 mt-2">{t("application.subtitle")}</p>
          </div>
        </div>
        
        {/* Application Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("application.name")} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>{t("application.phone")} *</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="earliestStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("application.earliestStartDate")} *</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferredInterviewDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("application.preferredInterviewDate")} *</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="settleStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("application.settleStatus")} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="englishLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("application.englishLevel")} *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Beginner/Elementary" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {t("application.englishBeginner")}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Intermediate" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {t("application.englishIntermediate")}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Advanced" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {t("application.englishAdvanced")}
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("application.employed")} *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "true")}
                            defaultValue={field.value ? "true" : "false"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("application.nationality")} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">{t("application.jobDescription")}</p>
                  </div> 
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      t("application.submit")
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ApplicationForm;
