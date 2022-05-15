import { Button, FormLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import styled from "@emotion/styled";
import { useCarsContext } from "../providers/CarTableProvider";
import { capitalize } from "../helpers/Utils";

const StyledFilterContainer = styled.div`
  flex: 1;
`;

const BorderedContainer = styled.div`
  margin: 24px;
  border: 1px solid #ededed;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-around;
  padding: 24px;
`;

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-around;
`;

const StyledFilterButton = styled(Button)`
  width: 30%;
  align-self: flex-end;
`;

export const Filter: React.FC = () => {
  const {
    manufacturerOptions,
    colorOptions,
    color,
    manufacturer,
    searchByManufacturer,
    searchByColor,
  } = useCarsContext();

  const [tempColorSelection, setTempColorSelection] = React.useState('')
  const [tempManufacturerSelection, setTempManufacturerSelection] = React.useState('')

  const onFilter = React.useCallback(() => {
    searchByColor(tempColorSelection)
    searchByManufacturer(tempManufacturerSelection)
  }, [tempColorSelection, tempManufacturerSelection, setTempColorSelection, setTempManufacturerSelection])

  return (
    <StyledFilterContainer>
      <BorderedContainer>
        <FormFieldWrapper>
          <FormLabel>Color</FormLabel>
          <Select
            id="color-selection"
            value={tempColorSelection}
            onChange={(e) => setTempColorSelection(e.target.value)}
            placeholder="All colors"
            displayEmpty
          >
            <MenuItem key={`color-all`} value={""}>
              All colors
            </MenuItem>
            {colorOptions.map((c) => (
              <MenuItem key={`color-${c}`} value={c}>
                {capitalize(c)}
              </MenuItem>
            ))}
          </Select>
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormLabel>Manufacturer</FormLabel>
          <Select
            id="color-selection"
            value={tempManufacturerSelection}
            onChange={(e) => setTempManufacturerSelection(e.target.value)}
            placeholder="All manufacturers"
            displayEmpty
          >
            <MenuItem key={`manufacturer-all`} value={""}>
              All manufacturers
            </MenuItem>
            {manufacturerOptions
              .map((s) => s.name)
              .map((c) => (
                <MenuItem key={`manufacturer-${c}`} value={c}>
                  {c}
                </MenuItem>
              ))}
          </Select>
        </FormFieldWrapper>
        <StyledFilterButton color="primary" variant="contained" onClick={onFilter}>
          Filter
        </StyledFilterButton>
      </BorderedContainer>
    </StyledFilterContainer>
  );
};
