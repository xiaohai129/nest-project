import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {
  private client: Redis;
  constructor(private readonly redisService: RedisService, private readonly configService: ConfigService) {
    this.getClient();
  }

  private async getClient() {
    this.client = await this.redisService.getClient();
  }

  public async set(key: string, value: any): Promise<any> {
    value = JSON.stringify(value);
    if (!this.client) {
      await this.getClient();
    }
    await this.client.set(key, value, 'EX', this.configService.get('redis.expires'));
  }

  public async get(key: string): Promise<any> {
    if (!this.client) {
      await this.getClient();
    }

    const data = await this.client.get(key);

    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public async del(key: string): Promise<any> {
    if (!this.client) {
      await this.getClient();
    }

    await this.client.del(key);
  }

  public async expire(name: string) {
    if (!this.client) {
      await this.getClient();
    }

    await this.client.expire(name, this.configService.get('redis.expires'));
  }
}
