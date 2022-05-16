import * as React from "react";
import styled from "@emotion/styled";
import { Car } from "../../types/Car.types";
import { Fab, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { capitalize } from "../../helpers/Utils";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavouritesContext } from "../../providers/FavouritesProvider";

const CarTableRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ededed;
  padding: 24px;
  margin: 12px 0;
  gap: 24px;
`;

const CarTableRowImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const CarTableRowImage = styled.img`
  height: 80px;
`;

const CarTableDataContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CarTableName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

interface CarTableRowProps {
  rowData: Car;
}

export const CarTableRow: React.FC<CarTableRowProps> = ({ rowData }) => {

    const { favourites, handleToggleFavourite } = useFavouritesContext()

  return (
    <CarTableRowContainer>
      <CarTableRowImageContainer>
        <CarTableRowImage src={rowData.pictureUrl} />
      </CarTableRowImageContainer>
      <CarTableDataContainer>
        <CarTableName data-testid="car-name">
          {rowData.manufacturerName} {rowData.modelName}
        </CarTableName>
        <div data-testid="car-details">
          Stock # {rowData.stockNumber} - {rowData.mileage.number}{" "}
          {rowData.mileage.unit} - {rowData.fuelType} - {capitalize(rowData.color)}{" "}
        </div>
        <Link
          underline="hover"
          width="fit-content"
          component={RouterLink}
          data-testid="car-link"
          to={"/car/" + rowData.stockNumber}
        >
          View details
        </Link>
      </CarTableDataContainer>
      <Fab onClick={() => handleToggleFavourite(rowData.stockNumber.toString())} data-testid="car-favour-btn">
        <FavoriteIcon color={favourites.includes(rowData.stockNumber.toString()) ? 'primary' : undefined} />
      </Fab>
    </CarTableRowContainer>
  );
};

const EmptyImage = styled.div`
  height: 80px;
  background: #e2e2e2;
  width: 100px;
`;

const EmptyLabel = styled.div`
  display: block;
  background: #e2e2e2;
  height: ${(props: { width: string; height?: string }): string =>
    props.height || "20px"};
  width: ${(props: { width: string; height?: string }): string => props.width};
`;

export const CarTableRowEmpty: React.FC = () => {
  return (
    <CarTableRowContainer>
      <CarTableRowImageContainer>
        <EmptyImage />
      </CarTableRowImageContainer>
      <CarTableDataContainer>
        <EmptyLabel width="70%" height="35px" />
        <EmptyLabel width="70%" />
        <EmptyLabel width="30%" />
      </CarTableDataContainer>
    </CarTableRowContainer>
  );
};
