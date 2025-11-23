export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCustomerDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    description?: string;
    isActive?: boolean;
}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {}
