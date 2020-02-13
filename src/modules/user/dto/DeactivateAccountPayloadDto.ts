'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class DeactivateAccountPayloadDto {
    @ApiProperty({ type: Boolean })
    success: boolean;

    constructor(success: boolean) {
        this.success = success;
    }
}
