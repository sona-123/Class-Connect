"use client"
import React from 'react'
import { Check,XCircle } from 'lucide-react'
import { useState } from 'react';
export default function SuccesMessage() {
    const [dismissed,setDismissed]=useState(false);
    const handleDismiss=()=>{
        setDismissed(true);
    }
    if(dismissed){
        return null;
    }
  return (
    <div>
      <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
  <div className="flex items-start gap-4">
  <span className="text-green-600">
            <Check size={24} strokeWidth={1.5} />
          </span>

    <div className="flex-1">
      <strong className="block font-medium text-gray-900"> Changes saved </strong>

      <p className="mt-1 text-sm text-gray-700">File Uploaded Successfully.</p>
    </div>

    <button 
    onClick={handleDismiss}
    className="text-gray-500 transition hover:text-gray-600">
      <span className="sr-only">Dismiss popup</span>

      <XCircle size={24} strokeWidth={1.5} />
    </button>
  </div>
</div>
    </div>
  )
}
