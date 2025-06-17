'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles } from 'lucide-react';

export function OnboardingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    tip: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create user
      const userResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to create user');
      }

      const userData = await userResponse.json();

      // Grant credit
      const creditResponse = await fetch('/api/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.id,
          source: 'Tip',
          amount: 1,
        }),
      });

      if (!creditResponse.ok) {
        throw new Error('Failed to grant credit');
      }

      // Show success animation
      setShowSuccess(true);

      // Redirect after delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Cooking Hack',
    'Study Tip',
    'Repair Trick',
    'Life Hack',
    'Tech Tip',
    'Career Advice',
    'DIY Project',
    'Other',
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {showSuccess ? (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm">
          <div className="credit-animation flex items-center justify-center bg-accent-orange text-white rounded-full w-20 h-20 mb-4">
            <Sparkles className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-center">+1 Credit!</h3>
          <p className="text-center mb-6">Thank you for sharing your talent!</p>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-primary-blue hover:bg-primary-blue/90 text-white"
            >
              View Dashboard
            </Button>
            <Button
              onClick={() => router.push('/onboarding')}
              variant="outline"
              className="border-accent-orange text-accent-orange hover:bg-accent-orange/10"
            >
              Share Another Tip
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8 bg-white rounded-xl shadow-sm"
        >
          <h2 className="text-2xl font-bold text-center text-primary-blue mb-6">
            Share Your Talent
          </h2>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-2 focus:border-primary-blue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp/Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border-2 focus:border-primary-blue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="border-2 focus:border-primary-blue">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tip">Your Tip</Label>
            <Input
              id="tip"
              name="tip"
              value={formData.tip}
              onChange={handleChange}
              required
              className="border-2 focus:border-primary-blue"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit & Earn Credit'}
          </Button>
        </form>
      )}
    </div>
  );
}
