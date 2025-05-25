export type ChartType = 'bar' | 'line' | 'area';

export interface Card {
    title: string,
    value: number,
    percentChange: number,
    icon: string,
    iconColor: string,
    previousValue: string,
    chartType: "line" | "bar" | "area",
    gradientStart: string,
    gradientEnd: string,
}
