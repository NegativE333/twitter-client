
interface UserIdProps{
    params: { Id : string }
}

const UserId = ({
    params
} : UserIdProps) => {
    return (  
        <div>
            {params.Id}
        </div>
    );
}
 
export default UserId;