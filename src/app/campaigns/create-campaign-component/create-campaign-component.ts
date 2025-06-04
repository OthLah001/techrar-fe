import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignsService } from '../campaigns.service';
import { TProvider, TTemplate } from '../campaigns.types';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-campaign-component',
  standalone: false,
  templateUrl: './create-campaign-component.html',
  styleUrl: './create-campaign-component.scss'
})
export class CreateCampaignComponent {
  form: FormGroup;
  templates: TTemplate[] = [];
  providers: TProvider[] = [];
  availableChannels: string[] = [];

  success: boolean | null = null; // Use null to differentiate between success and error states
  loading: boolean = false;
  selectedFile: File | null = null;
  missingFile: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private campaignsService: CampaignsService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      template_id: [null, Validators.required],
      provider_id: [null, Validators.required],
      channel: ['', Validators.required],
      subject: ['', [Validators.required, Validators.maxLength(255)]],
      message: ['', Validators.required],
      scheduled_at: [''],
    });
  }

  ngOnInit(): void {
    this.fetchTemplates();
    this.fetchProviders();
  }

  fetchTemplates() {
    this.campaignsService.getTemplateList().subscribe((templates) => {
      this.templates = templates;
    });
  }

  fetchProviders() {
    this.campaignsService.getProviderList().subscribe((providers) => {
      this.providers = providers;
    });
  }

  onTemplateChange(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    const selectedTemplate = this.templates.find((t) => t.id === selectedId);

    if (selectedTemplate && selectedTemplate.body) {
      this.form.patchValue({ message: selectedTemplate.body });
    }
  }

  onProviderChange(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    const selectedProvider = this.providers.find((p) => p.id === selectedId);
  
    if (selectedProvider) {
      this.availableChannels = selectedProvider.channel || [];
      this.form.patchValue({ channel: '' });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.missingFile = false;
    } else {
      this.selectedFile = null;
      this.missingFile = true;
    }
  }

  submit() {
    if (
      this.form.invalid || !this.selectedFile
    ) {
      this.missingFile = !this.selectedFile;
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.missingFile = false;
    this.success = null;

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('template_id', this.form.value.template_id.toString());
    formData.append('provider_id', this.form.value.provider_id.toString());
    formData.append('channel', this.form.value.channel);
    formData.append('subject', this.form.value.subject || '');
    formData.append('message', this.form.value.message);
    
      if (this.form.value.scheduled_at) {
        const scheduled_at = new Date(this.form.value.scheduled_at);
        formData.append('scheduled_at', scheduled_at.toISOString());
      }

    if (this.selectedFile) {
      formData.append('recipients_file', this.selectedFile);
    }

    this.campaignsService
      .createCampaign(formData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.success = true;
          this.form.reset();
          this.selectedFile = null;
          this.availableChannels = [];
          setTimeout(() => (this.success = null), 4000);
        },
        error: (err) => {
          this.errorMessage = err.error?.error_name ? err.error.message : 'An error occurred. Please try again!';
          this.success = false;
        },
      });
  }
}
