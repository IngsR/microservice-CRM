export interface Deal {
    id: number;
    title: string;
    description: string;
    status: 'NEW' | 'NEGOTIATION' | 'WON' | 'LOST';
    value: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDealDto {
    title: string;
    description: string;
    status: 'NEW' | 'NEGOTIATION' | 'WON' | 'LOST';
    value: number;
}

export interface UpdateDealDto extends Partial<CreateDealDto> {}
