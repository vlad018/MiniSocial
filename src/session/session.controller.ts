import { Controller, Get, Delete, Param } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
  ) {}

  @Get('test')
  createTestSession() {
    return this.sessionService.createSession(1);
  }

  @Get('test/:id')
  getTestSession(@Param('id') id: string) {
    return this.sessionService.getSession(id);
  }

  @Delete('test/:id')
  deleteTestSession(@Param('id') id: string) {
    return this.sessionService.deleteSession(id);
  }
}