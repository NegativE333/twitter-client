"use client";

import FeedCard from "@/components/feed-card";
import { useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import { CreateTweet } from "@/components/create-tweet";

export default function Home() {
  
  const {tweets = []} = useGetAllTweets();

  return (
    <div>
      <div>
        <CreateTweet />
      </div>
      {tweets?.map(tweet => tweet ? (
        <FeedCard 
          data={tweet as Tweet}
          key={tweet?.id}
        />
      ) : null)}
    </div>
  );
}
