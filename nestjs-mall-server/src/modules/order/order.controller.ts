import { Controller, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {}
