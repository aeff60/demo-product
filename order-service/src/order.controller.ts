// order-service/src/order.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Controller()
export class OrderController {
  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(orderData: { productId: number; quantity: number }) {
    const order = this.orderRepository.create(orderData);
    const savedOrder = await this.orderRepository.save(order);
    this.logger.log(`Order created with id ${savedOrder.id}`);
    return savedOrder;
  }

  @MessagePattern({ cmd: 'getOrders' })
  async getOrders() {
    const orders = await this.orderRepository.find();
    this.logger.log('Returning list of orders');
    return orders;
  }
}
