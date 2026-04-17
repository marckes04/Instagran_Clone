import { Box, Flex } from '@chakra-ui/react'
import Sidebar from '../../Sidebar/Sidebar' // ✅ Correcto
import { useLocation } from 'react-router-dom'

const PageLayout = ({children}) => {
    const {pathname} = useLocation()
  return (
    <Flex>
        {/*Sidebar on the left */}
       {pathname !== "/auth" ? (
        <Box w="250px" borderRight={"1px solid gray"}>
          <Sidebar />
        </Box>
       ) : null }
        {/*Main content on the right */}
    <Box flex={1} w={{base:"calc(100% - 70 px)",md:"calc(100% - 240px)"}}>
      {children}
    </Box>    
    </Flex>
  )
}

export default PageLayout