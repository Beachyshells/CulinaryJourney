import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { insertChildSchema } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const childFormSchema = insertChildSchema.extend({
  age: z.number().min(3, "Age must be at least 3").max(18, "Age must be at most 18"),
});

type ChildFormData = z.infer<typeof childFormSchema>;

interface ChildProfileFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChildProfileForm({ onClose, onSuccess }: ChildProfileFormProps) {
  const { toast } = useToast();

  const form = useForm<ChildFormData>({
    resolver: zodResolver(childFormSchema),
    defaultValues: {
      name: "",
      age: 5,
      gender: "girls",
      preferences: "",
    },
  });

  const createChildMutation = useMutation({
    mutationFn: async (data: ChildFormData) => {
      const response = await apiRequest("POST", "/api/children", data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/children"] });
      toast({
        title: "Profile Created! 🎉",
        description: `${data.name}'s cooking profile is ready!`,
      });
      onSuccess();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ChildFormData) => {
    createChildMutation.mutate(data);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-poppins font-bold text-gray-900">
              Create Child Profile
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Child's Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your child's name" 
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="3"
                      max="18"
                      placeholder="5"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 5)}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Theme Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border-2 border-pink-200 rounded-lg p-4 hover:bg-pink-50 transition-colors">
                        <RadioGroupItem value="girls" id="girls" />
                        <Label htmlFor="girls" className="flex-1 cursor-pointer">
                          <div className="gradient-girls rounded-lg p-3 mb-2">
                            <span className="text-white font-semibold">👧 Girls Edition</span>
                          </div>
                          <div className="flex gap-1 mb-2">
                            <div className="w-4 h-4 bg-pink-500 rounded"></div>
                            <div className="w-4 h-4 bg-pink-600 rounded"></div>
                            <div className="w-4 h-4 bg-pink-400 rounded"></div>
                          </div>
                          <p className="text-xs text-gray-600">Pink & purple theme</p>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border-2 border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                        <RadioGroupItem value="boys" id="boys" />
                        <Label htmlFor="boys" className="flex-1 cursor-pointer">
                          <div className="gradient-boys rounded-lg p-3 mb-2">
                            <span className="text-white font-semibold">👦 Boys Edition</span>
                          </div>
                          <div className="flex gap-1 mb-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <div className="w-4 h-4 bg-blue-400 rounded"></div>
                          </div>
                          <p className="text-xs text-gray-600">Blue & green theme</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preferences Field */}
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Food Preferences & Allergies
                    <span className="text-sm text-gray-500 font-normal ml-2">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., loves chocolate, allergic to nuts, vegetarian, dislikes spicy food..."
                      {...field}
                      className="text-base resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createChildMutation.isPending}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
              >
                {createChildMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Profile"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
