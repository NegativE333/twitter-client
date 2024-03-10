import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";

interface FeedCardProps{
    data: Tweet
}

const FeedCard = ({
    data
} : FeedCardProps) => {

    console.log(data);

    return(
        <div className="border border-r-0 border-b-0 border-l-0 border-gray-600 p-5 hover:bg-slate-900 transition-all">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                    {data.author?.profileImageURL && (
                        <Image 
                            src={data.author?.profileImageURL}
                            alt="image"
                            height={50}
                            width={50}
                            className="rounded-full"
                        />
                    )}
                </div>
                <div className="col-span-11">
                    <h5>
                        <Link href={`/${data.author?.id}`}>
                            {data.author?.firstName} {data.author?.lastName}
                        </Link>
                    </h5>
                    <p>
                       {data.content}
                    </p>
                    <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
                        <div>
                            <BiMessageRounded />
                        </div>
                        <div>
                            <AiOutlineRetweet />
                        </div>
                        <div>
                            <AiOutlineHeart />
                        </div>
                        <div>
                            <BiUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard;