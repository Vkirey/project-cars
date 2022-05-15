import styled from "@emotion/styled";
import { Button } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import { CarTableName } from "../components/CarsTable/CarTableRow";
import { PageLayout } from "../components/PageLayout";
import { useApi } from "../helpers/Api";
import { capitalize } from "../helpers/Utils";
import { useFavouritesContext } from "../providers/FavouritesProvider";
import { Car } from "../types/Car.types";

const CarDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  gap: 24px;
`;

const CarImageContainer = styled.div`
  display: flex;
  justify-content: center;
  background: #e2e2e2;
  flex: 1;
  padding: 24px;
`;

const CarImage = styled.img``;

const CarDetailsBlock = styled.div`
  padding: 0 10%;
  flex: 1;
  display: flex;
  gap: 24px;
`;

const CarInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FavouritesBlock = styled.div`
  flex: 1;
  border: 1px solid #e2e2e2;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledSaveButton = styled(Button)`
  width: 30%;
  align-self: flex-end;
`;

export const CarDetailsPage: React.FC = () => {
  const [details, setDetails] = React.useState<Car | null>(null);
  const [isFavourite, setIsFavourite] = React.useState<boolean>(false);

  const { id } = useParams();
  const { getCar } = useApi();
  const { favourites, addFavourite, removeFavourite } = useFavouritesContext();

  React.useEffect(() => {
    if (id) {
      getCar(id).then((c) => setDetails(c));
    }
  }, [id]);

  React.useEffect(() => {
    if (id) {
      setIsFavourite(favourites.includes(id));
    }
  }, [id, favourites]);

  const handleClick = React.useCallback(() => {
    if (!id) {
      return;
    }
    if (isFavourite) {
      removeFavourite(id);
    } else {
      addFavourite(id);
    }
  }, [isFavourite, id]);

  return details ? (
    <PageLayout>
      <CarDetailsContainer>
        <CarImageContainer>
          <CarImage src={details.pictureUrl} />
        </CarImageContainer>
        <CarDetailsBlock>
          <CarInfo>
            <CarTableName>
              {details.manufacturerName} {details.modelName}
            </CarTableName>
            <div>
              Stock # {details.stockNumber} - {details.mileage.number}{" "}
              {details.mileage.unit} - {details.fuelType} -{" "}
              {capitalize(details.color)}{" "}
            </div>
            <p>
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery time shown in this
              page are not definitive and may change due to bad weather
              conditions.
            </p>
          </CarInfo>
          <FavouritesBlock>
            {isFavourite ? (
              <p>
                This item is added as your favourite. If you want to remove it
                from favourite collection - please click the button below.
              </p>
            ) : (
              <p>
                If you like this car click this button and save it in your
                collection of favourite items.
              </p>
            )}
            <StyledSaveButton
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              {isFavourite ? "Remove" : "Save"}
            </StyledSaveButton>
          </FavouritesBlock>
        </CarDetailsBlock>
      </CarDetailsContainer>
    </PageLayout>
  ) : (
    <div>Loading...</div>
  );
};
