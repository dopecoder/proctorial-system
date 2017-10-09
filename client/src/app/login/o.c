#nclude<stdio.h>
#include<stdlib.h>

int country_exists(int * country){
    int * temp_ptr = country;
    int counter = 0;
    while(temp_ptr!=NULL){
        counter++;
        temp_ptr++;
    }
    if(counter > 0){
        return 1;
    }else{
        return 0;
    }
}

int no_from_pair_exists(int * pair, int * country){
    int * temp_ptr = country;
    printf("pairs no 1 : %d, No 2: %d\n", pair[0], pair[1]);
    printf("pairs country : %d\n", *temp_ptr);
    while(temp_ptr!=NULL && country_exists(country)){
        if(pair[0] == *temp_ptr || pair[1] == *temp_ptr) {
            return 1;
        }
        temp_ptr++;
    }
    return 0;
}
void add_to_country(int * pair, int * country){
    int * temp_ptr = country;
    int num_1_exists = 0;
    int num_2_exists = 0;
    while(temp_ptr!=NULL){
        if(pair[0] == *temp_ptr) {
            num_1_exists = 1;
        }
        if(pair[1] == *temp_ptr) {
            num_2_exists = 1;
        }
        temp_ptr++;
    }
    temp_ptr = country;
    if(!num_1_exists){
    *temp_ptr = pair[0];
    }
    *temp_ptr++;
    if(!num_2_exists){
    *temp_ptr = pair[1];
    }    
}
int astronaut_exists(int a, int b, int * country){
    int * temp_ptr = country;
    int num_1_exists = 0;
    int num_2_exists = 0;
    while(temp_ptr!=NULL){
        if(a == *temp_ptr) {
            num_1_exists = 1;
        }
        if(b == *temp_ptr) {
            num_2_exists = 1;
        }
        temp_ptr++;
    }
    return num_1_exists && num_2_exists;
}

int exists_already_commit(int * pair, int ** countries, int l){
    for(int i=0; i<l; i++){
        if(no_from_pair_exists(pair, countries[i])){
            add_to_country(pair, countries[i]);  
            return 1;
        }
    }
    return 0;
}

void add_new_country(int * pair, int ** countries, int l){
    for(int i=0; i<l; i++){
        if(!country_exists(countries[i])){
            add_to_country(pair, countries[i]); 
        }
    }
}

int calculate_sets(int ** pairs, int ** countries, int n){
    int sets=0;
    for(int i=1; i<=n; i++){
        for(int j=i+1; j<=n; j++){
            if(!astronaut_exists(i, j, countries[i])){
                sets++;
            }
        }
    }
    return sets;
}

int main()
{
    int n,l;
    scanf("%d%d",&n,&l);
    if(n==1)
    {
        printf("0\n");
        return(0);
    }
    int **pairs=(int**)malloc(sizeof(int*)*l);
    for(int i=0;i<l;i++)
        pairs[i]=(int*)calloc(2,sizeof(int));
    
    long long int ans=0;
   
    /** Write code to compute answer using n,l,pairs**/
    int **countries = (int**)malloc(sizeof(int)*n);
    for(int i=0; i<l; i++){
        countries[i] = (int*)malloc(sizeof(int)*n);
    }
    
    for(int i=0; i<l; i++){
      scanf("%d%d",&pairs[i][0],&pairs[i][1]);
      printf("No 1 : %d, No 2: %d\n", pairs[i][0], pairs[i][1]);
      if(exists_already_commit(pairs[i], countries, l)){
          continue;
      }
      add_new_country(pairs[i], countries, l);
    }
    
    ans = calculate_sets(pairs, countries, n);
  
    printf("%lld\n",ans);
    return(0);
}
