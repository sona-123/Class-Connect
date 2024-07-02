// FileShareForm Component
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from "../../../../../_utils/GlobalApi";

export default function FileShareForm({ file, onPasswordSave }) {
  const [isPasswordEnable, setIsEnablePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useUser();
  const [recipientEmail,setRecipientEmail]=useState('');
  console.log(email);
  const sendEmail = () => {
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    const data = {
      emailToSend: email,
      userName: user?.fullName || 'User', // Fallback in case user fullName is undefined
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    };
    
    GlobalApi.SendEmail(data)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to send email');
        }
        return response.data;
      })
      .then(data => {
        console.log(data);
        alert('Email sent successfully!');
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again later.');
      });
      console.log(data);
  };
  const onClickCopy = () => {
    navigator.clipboard.writeText(file.shortUrl);
    alert('URL Copied to your clipboard!');
  };

  return file && (
    <div className='flex flex-col gap-2'>
      {/* Short URL Section */}
      <div>
        <label className='text-[14px] text-gray-500'>Short URL</label>
        <div className='flex gap-5 p-2 border rounded-md'>
          <input
            type="text"
            value={file.shortUrl}
            disabled
            className='disabled:text-gray-500 bg-transparent outline-none'
            aria-disabled="true"
          />
          <Copy className='text-gray-400 hover:text-black cursor-pointer' 
            onClick={onClickCopy}
          />
        </div>
      </div>

      {/* Enable Password Section */}
      <div className='gap-3 flex mt-5'>
        <input
          type='checkbox'
          onChange={(event) => setIsEnablePassword(event.target.checked)}
        />
        <label>Enable Password</label>
      </div>

      {/* Password Input Section */}
      {isPasswordEnable && (
        <div className='flex gap-3 items-center'>
          <div className='border rounded-md w-full p-2'>
            <input
              type="password"
              className='disabled:text-gray-500 bg-transparent outline-none'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            className='p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-red-500'
            disabled={password.length < 3}
            onClick={() => onPasswordSave(password)}
          >
            Save
          </button>
        </div>
      )}

      {/* Send File to Email Section */}
      <div className='border rounded-md p-3 mt-5'>
        <label className='text-[14px] text-gray-500'>Send File to Email</label>
        <div className='border rounded-md p-2'>
          <input
            type="email"
            placeholder='example@gmail.com'
            className='bg-transparent outline-none w-full'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <button
          className='p-2 disabled:bg-gray-300 bg-primary text-white hover:bg-blue-600 w-full mt-2 rounded-md'
          
          onClick={sendEmail}

          disabled={!email}
        >
          Send Email
        </button>
      </div>
    </div>
  );
}
