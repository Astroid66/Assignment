void setup() {
  pinMode(8, INPUT);
  Serial.begin(9600);
}

char enc_flag[] = "[REDACTED one time encrypted flag]";
int len = 32;
int key[8] = {0, 1, 2, 3, 4, 5, 6, 7}/*SECRET: dummy key given*/;
  
void loop() {
  // * try to understand what this code does
  //   and try to reverse the process
  
  // * you can also write code to perform the reverse process
  //   Although not completely necesary.
  
  // * google anything new and try to work out as many things as possible
  //   on your own.
  
  char iv = digitalRead(8);
  Serial.println(iv);
  int acc;
  char output[len +1];
  output[len] = '\0';
  
  for( int i = 0; i < len; i++){
    int x = enc_flag[i];
    x ^= iv;
    acc = 0;
    for( int j = 0; j < 8; j++){
      int b = (x >> j) & 1;
      acc |= (b << key[j]);
    }
    iv = acc;
    //Serial.println(acc);
    output[i] = acc;
  }

  // Now the flag is double encrypted!!!!
  for(int i = 0; i < len; i++){
    Serial.print(output[i]);
  }
  Serial.println("");
}
