import { TagObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export enum ApiTag {
    Auth = 'Auth',
    User = 'User',
    Category = 'Category',
}

export const API_TAGS = Object.values(ApiTag).map((value) => {
    return { name: value } as TagObject;
});