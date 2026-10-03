import { Avatar, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { timeAgo } from '../../utils/timeAgo'
import useUserProfileStore from '../../Store/userProfileStore'

const Caption = ({post}) => {
const userProfile = useUserProfileStore(state => state.userProfile)
  return (
   <Flex gap={4}>
    <Link to ={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={"sm"}/>
    </Link>
    <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
             <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} size={"sm"}/>
             </Link>
             <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${userProfile.username}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{post.Caption}</Text>
                </Flex>
             </Flex>
        </Flex>
        <Text fontSize={12} color={"gray"}>
            {timeAgo(post.createdAt)}
        </Text>
    </Flex>
   </Flex>
  )
}

export default Caption