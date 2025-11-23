export interface Company {
    id: number;
    name: string;
    industry: string;
    website: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCompanyDto {
    name: string;
    industry: string;
    website?: string;
    address?: string;
}

export interface UpdateCompanyDto extends Partial<CreateCompanyDto> {}
