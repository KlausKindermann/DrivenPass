import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @ApiOperation({ summary: "Checks APIs health" })
  @ApiResponse({ status: HttpStatus.OK, description: "I'm okay!" })
  getHealth(): string {
    return this.appService.getHealth();
  }
}
