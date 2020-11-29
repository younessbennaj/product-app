//Composant pour display le prix du produit
import Box from '@material-ui/core/Box';

const Price = ({ children }) => {
    return (
        <Box color="primary" fontWeight="fontWeightBold" fontSize={32} py={3} lineHeight="normal">
            <p style={{ margin: "0" }}>${children}</p>
        </ Box>
    );
}

export default Price;