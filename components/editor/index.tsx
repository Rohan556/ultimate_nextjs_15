"use client";

import React from "react";
import "@mdxeditor/editor/style.css";
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  imagePlugin,
} from "@mdxeditor/editor";
import "./dark-editor.css";
import { basicDark } from "cm6-theme-basic-dark";
import { useTheme } from "next-themes";

interface Props {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  value: string;
  fieldChange: (value: string) => void;
}

const Editor = ({ editorRef, value, fieldChange, ...props }: Props) => {
  const { resolvedTheme } = useTheme();

  const themeExtension = resolvedTheme === "dark" ? [basicDark] : [];

  try {
    return (
      <MDXEditor
        markdown={value}
        onChange={fieldChange}
        ref={editorRef}
        className="background-light800_dark200 light-border-2 markdown-editor dark-editor grid w-full border"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          tablePlugin(),
          codeBlockPlugin({
            defaultCodeBlockLanguage: "js",
            codeBlockEditorDescriptors: [],
          }),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          imagePlugin(),
          codeMirrorPlugin({
            codeBlockLanguages: {
              css: "css",
              txt: "txt",
              sql: "sql",
              html: "html",
              sass: "sass",
              scss: "scss",
              bash: "bash",
              json: "json",
              js: "javascript",
              ts: "typescript",
              tsx: "Typescript (React)",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: themeExtension,
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
          toolbarPlugin({
            toolbarContents: () => {
              return (
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <UndoRedo />
                          <Separator />
                          <BoldItalicUnderlineToggles />
                          <ListsToggle />
                          <CreateLink />
                          <InsertImage />
                          <InsertTable />
                          <InsertThematicBreak />
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
              );
            },
          }),
        ]}
        {...props}
      />
    );
  } catch (err) {
    console.log(err);
  }
};

export default Editor;
