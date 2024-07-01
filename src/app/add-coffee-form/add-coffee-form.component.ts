import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CoffeeHttpService } from '../coffee-http.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-coffee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-coffee-form.component.html',
  styleUrl: './add-coffee-form.component.css'
})
export class AddCoffeeFormComponent {

  getGrindLevel(value: number): string {
    switch (value) {
      case 1:
        return 'Coarse';
      case 2:
        return 'Medium-Coarse';
      case 3:
        return 'Medium';
      case 4:
        return 'Fine';
      case 5:
        return 'Extra Fine'
      default:
        return 'Unknwon';
    }
  }
  coffeeForm!: FormGroup;

  getSingleOrigin(value: boolean): string {
    if (value){
      return "True";
    } else {
      return "False";
    }
  }

  constructor(
    private fb: FormBuilder, 
    private coffeeService: CoffeeHttpService, 
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {

    
    this.coffeeForm = this.fb.group({
      brand: ['', Validators.required],
      groundOrBeans: ['Bean'],
      roast: ['Light'],
      singleOrigin: [false],
      grindLevel: [1],
      flavorNotes: [''],
    });
  }

  get brand() {
    return this.coffeeForm.get('brand');
  }

  onSubmit(): void {
    
    const formData = this.coffeeForm.value;
    if (this.coffeeForm.valid) {
      const formData = this.coffeeForm.value;
      console.log('Submitting the following: ', formData)
      this.coffeeService.submitCoffee(formData).subscribe(
        response => {
          console.log('Entry Submitted successfully', response);
          this.clearForm();
          this.toaster.success("Entry Submitted Successfully", "Sucess");
        },
        error => {
          console.error('Submission Failed..', error);
          this.toaster.error("Submission Failed ", "Error");
        }
        
      )
    } else {
      console.error("Invalid Form");
      console.log(formData);
      this.toaster.error("Please Fill Coffee Brand", "Error");
    }

  }

  clearForm(): void {
    this.toaster.info("Form has been reset", "Info");
    this.coffeeForm.reset({
      brand: '',
      groundOrBeans: 'Bean',
      roast: 'Light',
      singleOrigin: false,
      grindLevel: 1,
      flavorNotes: '',
    });

  }

}
