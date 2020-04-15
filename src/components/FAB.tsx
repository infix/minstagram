import { Button, Icon } from "@ui-kitten/components";
import React from "react";

const IconPlus = (props: any) => <Icon name={"plus-outline"} {...props} />

export const FAB = ({ onPress }) =>
  <Button
    accessoryRight={IconPlus}
    status="primary"
    onPress={onPress}
    style={{
      position: 'absolute',
      borderRadius: 56,
      height: 56,
      width: 56,
      bottom: 32,
      right: 32
    }}
  />;
