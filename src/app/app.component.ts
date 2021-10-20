import { Component } from "@angular/core";
import { FormControl, FormGroup, FormArray, FormBuilder } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "app.component.html"
})
export class AppComponent {
  form: FormGroup;
  hideArray: Array<boolean> = [];
  options: any = [
    { key: "set", value: "Set" },
    { key: "wait", value: "Wait" },
    { key: "go", value: "Go" }
  ];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      credentials: this.fb.array([])
    });
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(
      this.fb.group({
        action: "",
        name: "",
        label: { disabled: true, value: "" },
        toggle: false
      })
    );
    this.hideArray.push(false);
  }

  changeAction(e, index) {
    console.log(e, index);
    if (e === "set" || e === "go") {
      this.form
        .get("credentials")
        .at(index)
        .get("label")
        .enable();
    } else {
      this.form
        .get("credentials")
        .at(index)
        .get("label")
        .disable();
    }
  }

  updateData(index: number) {
    const myForm = (<FormArray>this.form.get("credentials")).at(index);
    let currentVal = !myForm.value.toggle;
    console.log("Before=>", myForm, myForm.value.toggle);
    myForm.patchValue({
      toggle: currentVal
    });
    this.hideArray[index] = currentVal;
    console.log("=>", myForm, myForm.value.toggle);
  }

  trackFn(index) {
    return index;
  }
}
