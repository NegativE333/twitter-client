import Image from "next/image";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";

const FeedCard = () => {
    return(
        <div className="border border-r-0 border-b-0 border-l-0 border-gray-600 p-5 hover:bg-slate-900 transition-all">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                    <Image 
                        src="https://media.licdn.com/dms/image/D4D03AQEU6j-n6BAQVQ/profile-displayphoto-shrink_400_400/0/1697514456697?e=1714003200&v=beta&t=RwPNPewZ82HQOLNd0jz51DBcD5VP7P40oSj1hjx7p64"
                        alt="image"
                        height={50}
                        width={50}
                        className="rounded-full"
                    />
                </div>
                <div className="col-span-11">
                    <h5>
                        Om Tekade
                    </h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum iure libero distinctio officiis dolores! Eum recusandae dolorum alias quidem, quas modi, fuga exercitationem corporis pariatur eaque voluptatibus iste laudantium enim!
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