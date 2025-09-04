import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useMemo } from "react";

type Props = {
  headerType: "add" | "edit" | "list";
  title: string;
  moduleName: string;
  moduleRouteKey: string;
  onAddClick?: () => void;
};

const Header: React.FC<Props> = ({ headerType, title, moduleName, moduleRouteKey, onAddClick }) => {
  const navigate = useNavigate();

  const shouldDisplayAddButton = useMemo(() => ["list", "edit"].includes(headerType), [headerType]);
  const shouldDisplayBackNavigationButton = useMemo(() => ["add", "edit"].includes(headerType), [headerType]);

  const parsedTitle = useMemo(() => {
    switch (headerType) {
      case "add":
        return `Add ${moduleName}`;
      case "edit":
        return `Edit ${moduleName}`;
      case "list":
        return `List ${moduleName}`;
      default:
        return title;
    }
  }, [headerType, moduleName, title]);

  return (
    <Fragment>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={8}>
          {shouldDisplayBackNavigationButton && (
            <Button
              type="link"
              onClick={() => navigate(-1)}
              icon={<ArrowLeftOutlined />}
              iconPosition="start"
              shape="circle"
            ></Button>
          )}
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {parsedTitle}
          </Typography.Title>
        </Flex>
        <Link to={`/${moduleRouteKey}/add`}>
          {shouldDisplayAddButton && (
            <Button
              type="primary"
              shape="round"
              size="large"
              icon={<PlusOutlined />}
              iconPosition="start"
              onClick={onAddClick}
            >
              Add
            </Button>
          )}
        </Link>
      </Flex>
      <Divider />
    </Fragment>
  );
};

export default Header;
