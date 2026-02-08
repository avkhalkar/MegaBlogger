import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';


export default function RTE({ name, control, label, defaultValue = "", rules }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1 text-slate-800'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        rules={rules}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinyMCEApiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />

    </div>
  )
}

// NOTE:
// Changing controller's name only changes the key under which value is stored in the form data
// Here we chose content so value now will be stored under content key