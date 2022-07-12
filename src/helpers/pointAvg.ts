import { IRate } from 'types/rate.model';

export const pointAvg =( totalRate: number, listRate: IRate[])=> {
    const totalPointRate = listRate.reduce(
        (total, current) => total + current.point,0
    );
     return (totalPointRate / totalRate)
}