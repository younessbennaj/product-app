//Composant pour styliser les composant Link de React Router

//React router
import {
    Link as RouterLink
} from "react-router-dom";

const StyledRouterLink = ({ children, url }) => {
    return (
        <RouterLink to={url} style={{ textDecoration: 'none', color: "#fff" }}>{children}</RouterLink>
    )
}

export default StyledRouterLink;