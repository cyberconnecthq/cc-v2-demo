import React from "react";
import Head from "next/head";

import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  const [mounted, setIsMounted] = React.useState(false);
  const { address, isConnected } = useAccount();
  const [targetContentId, setTargetContentId] = React.useState("");
  const [cc, setCC] = React.useState<CyberConnect>();
  const [handle, setHandle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [contentId, setContentId] = React.useState("");
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  React.useEffect(() => {
    setIsMounted(true);
    const cyberConnect = new CyberConnect({
      namespace: "CyberConnect",
      env: Env.STAGING,
      provider: (window as any)?.ethereum,
    });

    setCC(cyberConnect);
  }, []);

  const createPost = async () => {
    const res = await cc?.createPost({
      title: title,
      body: body,
      author: handle,
    });

    console.log(res);

    setContentId(res?.contentID);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isConnected && address && mounted ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: 10,
              marginTop: 200,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 10,
                justifyContent: "center",
                width: 300,
              }}
            >
              <p>Handle</p>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 10,
                justifyContent: "center",
                width: 300,
              }}
            >
              <p>Title</p>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 10,
                justifyContent: "center",
                width: 300,
              }}
            >
              <p>Body</p>
              <input value={body} onChange={(e) => setBody(e.target.value)} />
            </div>
            {contentId && <p>Content ID: {contentId}</p>}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 10,
                justifyContent: "center",
                width: 300,
              }}
            >
              <p>Content ID</p>
              <input
                value={targetContentId}
                onChange={(e) => setTargetContentId(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", columnGap: 10 }}>
              <button onClick={() => cc?.follow(handle)}>follow</button>
              <button onClick={() => cc?.unfollow(handle)}>unfollow</button>
              <button onClick={createPost}>Create Post</button>
              <button
                onClick={() =>
                  cc?.updatePost(targetContentId, {
                    title,
                    body,
                    author: handle,
                  })
                }
              >
                Update Post
              </button>
              <button onClick={() => cc?.like(targetContentId)}>
                Like Content
              </button>
              <button onClick={() => cc?.dislike(targetContentId)}>
                Dislike Content
              </button>
              <button onClick={() => cc?.cancelReaction(targetContentId)}>
                Cancel Like
              </button>
              <button
                onClick={() =>
                  cc?.createComment(targetContentId, {
                    title: "Comment 001",
                    body: "This is a comment",
                    author: handle,
                  })
                }
              >
                Comment Content
              </button>
              <button
                onClick={() =>
                  cc?.updateComment(
                    "d9071055a186b805034928792b866f5b94705623b10f07a9a5e03e655d764d37",
                    targetContentId,
                    {
                      title: "Comment 001 Updated",
                      body: "This is an updated comment",
                      author: handle,
                    }
                  )
                }
              >
                Update Comment Post
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => connect()}>Connect Wallet</button>
        )}
      </main>
    </>
  );
}
