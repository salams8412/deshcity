import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | DeshCity - Style Meets Tradition`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || 'Premium Bangladeshi eCommerce platform for Home Decor and Lifestyle products.');
  }, [title, description]);

  return null;
}
