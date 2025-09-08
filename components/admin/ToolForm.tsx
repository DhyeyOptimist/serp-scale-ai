
'use client'

import { createTool, updateTool } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import SubmitButton from "./SubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category, Tool } from "@/models/Tool";
import { createClient } from "@/lib/supabaseClient";
import ImageUploader from "./ImageUploader";
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface ToolFormProps {
  initialData?: Tool;
}


export default function ToolForm({ initialData }: ToolFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [catError, setCatError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category || "");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  // Fetch categories on mount
  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
      if (error) setCatError('Could not load categories');
      else setCategories(data || []);
    })();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setFormError(null);
    setFormSuccess(false);
    
    try {
      const action = initialData ? updateTool.bind(null, initialData.id) : createTool;
      const result = await action(formData);
      
      if (result && typeof result === 'object' && 'success' in result && result.success === false) {
        const errorMsg = ('message' in result ? result.message : 'An error occurred') || 'An error occurred';
        setFormError(errorMsg);
      } else {
        setFormSuccess(true);
        // If there's a destination, redirect after a brief delay
        if (result && typeof result === 'object' && 'destination' in result && result.destination) {
          setTimeout(() => {
            window.location.href = result.destination;
          }, 500);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError('An unexpected error occurred. Please try again.');
    }
  };

  const submitButtonText = initialData ? 'Update Tool' : 'Create Tool';

  return (
    <form action={handleSubmit} className="space-y-8" encType="multipart/form-data" autoComplete="off">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={initialData?.name || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Textarea
          id="short_description"
          name="short_description"
          rows={2}
          required
          defaultValue={initialData?.short_description || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="full_description">Full Description</Label>
        <Textarea
          id="full_description"
          name="full_description"
          rows={6}
          defaultValue={initialData?.full_description || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Logo</Label>
        <ImageUploader
          id="logo"
          name="logo"
          initialImageUrl={initialData?.logo_url || ''}
        />
        <input type="hidden" name="existing_logo_url" value={initialData?.logo_url || ''} />
        <div className="space-y-2 mt-2">
          <Label htmlFor="logo_url_input">Or provide a logo image URL</Label>
          <Input
            id="logo_url_input"
            name="logo_url_input"
            type="url"
            placeholder="https://example.com/logo.png"
            defaultValue={initialData?.logo_url || ''}
          />
          <p className="text-sm text-gray-500">If both are provided, the link will be used.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website_url">Website URL</Label>
        <Input
          id="website_url"
          name="website_url"
          type="url"
          required
          defaultValue={initialData?.website_url || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          defaultValue={initialData?.rating?.toString() || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricing_model">Pricing Model</Label>
        <Input
          id="pricing_model"
          name="pricing_model"
          defaultValue={initialData?.pricing_model || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          name="category"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Select a category</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="category" value={selectedCategory} />
        <div className="text-sm text-gray-500">Or create a new category below</div>
        <Input
          id="new_category"
          name="new_category"
          placeholder="New category name"
          defaultValue=""
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          required
          defaultValue={initialData?.slug || ''}
        />
        <p className="text-sm text-gray-500">
          URL-friendly version of the tool name (e.g., "ai-assistant")
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_featured"
          name="is_featured"
          defaultChecked={initialData?.is_featured || false}
        />
        <Label htmlFor="is_featured">Featured Tool</Label>
      </div>

      {/* FAQs section - we could add dynamic FAQs fields in a future enhancement */}

      {/* Error message area */}
      {formError && (
        <div className="text-red-600 border border-red-300 bg-red-50 rounded p-3">
          <strong>Error:</strong> {formError}
        </div>
      )}
      
      {/* Success message area */}
      {formSuccess && (
        <div className="text-green-600 border border-green-300 bg-green-50 rounded p-3">
          <strong>Success!</strong> Tool created successfully. Redirecting...
        </div>
      )}
      
      {catError && (
        <div className="text-red-600 border border-red-300 bg-red-50 rounded p-3">
          <strong>Warning:</strong> {catError}
        </div>
      )}

      <SubmitButton loadingText={initialData ? "Updating..." : "Creating..."}>
        {submitButtonText}
      </SubmitButton>
    </form>
  );
}
