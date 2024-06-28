import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'amocrm-js';

@Controller('api')
export class AmocrmController {
    constructor(
      private configService: ConfigService
    ) {}
    
    @Get('leads')
    async getLeads(@Query() query) {
      
      const client = new Client({
        domain: this.configService.get<string>('domain'),
        auth: {
          client_id: this.configService.get<string>('client_id'),
          client_secret: this.configService.get<string>('client_secret'),
          redirect_uri: this.configService.get<string>('redirect_url'),
          bearer: this.configService.get<string>('bearer')
        }
      })

      const lead = await client.leads.get({
        order: 'created_at',
        query: query.leadsSearchParameter,
        // with: 'contacts'
      })

      const leads = lead.getData().map(l => ({
        id: l.id,
        name: l.name,
        price: l.price,
        created_by: l.created_by,
        updated_by: l.updated_by,
        is_deleted: l.is_deleted
      }))

      const contact = await client.contacts.get({
        query: query.contactsSearchParameter
      })
      const contacts = contact.getData().map(c => ({
        id: c.id,
        name: c.name,
        first_name: c.first_name,
        last_name: c.last_name,
        created_by: c.created_by,
        updated_at: c.updated_at,
        is_deleted: c.is_deleted
      }))

      return {
        leads: leads,
        contacts: contacts
      }
    }
}
