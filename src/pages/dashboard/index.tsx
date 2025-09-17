import { Col, Flex, Row, Typography } from "antd";
import React from "react";
import ChartCardWrapper from "src/components/organism/ChartCardWrapper";
import KPICard from "src/components/molecules/KPICard";
import DemoLineChart from "src/components/molecules/DemoLineChart";
import useCategories from "src/pages/menu/hooks/useCategories";
import useIngredients from "src/pages/menu/hooks/useIngredients";
import useMenus from "src/pages/menu/hooks/useMenus";
import { useTheme } from "../../context/themeContext";
import DemoPieChart from "src/components/molecules/DemoPieChart";
import { defineAbilityFor } from "src/lib/ability/ability";
import { useAppSelector } from "src/store";

const Index: React.FC = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const { theme } = useTheme();
  const { ingredients } = useIngredients();
  const { categories } = useCategories();
  const { menus } = useMenus();
  const ability = defineAbilityFor(currentUser);
  const canAccessDashboardKpi = ability.can("read", "Kpi");

  const stats = {
    totalMenu: menus?.length ?? 0,
    totalCategories: categories?.length ?? 0,
    totalIngredients: ingredients?.length ?? 0,
    popularDish: "Margherita Pizza",
  };

  return (
    <div className={`indexContainer ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <Flex vertical gap={16}>
        <Typography.Title level={2}>Dashboard</Typography.Title>
        {canAccessDashboardKpi && (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Total Menu" value={stats.totalMenu} />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Categories" value={stats.totalCategories} />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Ingredients" value={stats.totalIngredients} />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <KPICard title="Popular Dish" value={stats.popularDish} />
            </Col>
          </Row>
        )}
        <Row gutter={[16, 16]} align="top">
          <Col xs={24} sm={12}>
            <ChartCardWrapper title="(Demo Data) Sales Over Time">
              <DemoLineChart />
            </ChartCardWrapper>
          </Col>
          <Col xs={24} sm={12}>
            <ChartCardWrapper title="(Demo Data) Menu Items by Category">
              <DemoPieChart />
            </ChartCardWrapper>
          </Col>
        </Row>
      </Flex>
    </div>
  );
};

export default Index;
