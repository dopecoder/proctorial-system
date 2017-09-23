#include<stdio.h>
#include<stdlib.h>

void print_countries(int ** countries, int n){
    printf("Running print_countries\n");
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            printf("%d ", countries[i][j]);
        }
        printf("\n");
    }
}

int country_exists(int * country){
    //printf("Running country_exists\n");
    int * temp_ptr = country;
    int counter = 0;
    while(*temp_ptr>0){
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
    //printf("Running no_from_pair_exists\n");
    int * temp_ptr = country;
    //printf("pairs no 1 : %d, No 2: %d\n", pair[0], pair[1]);
    //printf("pairs country : %d\n", *temp_ptr);
    while(*temp_ptr>0 && country_exists(country)){
        if(pair[0] == *temp_ptr || pair[1] == *temp_ptr) {
            return 1;
        }
        temp_ptr++;
    }
    return 0;
}
void add_to_country(int * pair, int * country, int n){
    //printf("Running add_to_country\n");
    int * temp_ptr = country;
    int num_1_exists = 0;
    int num_2_exists = 0;
    int counter = 0;
    //printf("No 1 : %d, No 2: %d\n", pair[0], pair[1]);
    while(*temp_ptr>0 && country_exists(country)){
        if(pair[0] == *temp_ptr) {
            num_1_exists = 1;
        }
        if(pair[1] == *temp_ptr) {
            num_2_exists = 1;
        }
        temp_ptr++;
        counter++;
    }
    //printf("COUNTER : %d\n", counter);
    
    temp_ptr = country;
    counter = 0;
    while(*temp_ptr>0){
        temp_ptr++;
        counter++;
    }
    //printf("COUNTER : %d\n", counter);
    if(!num_1_exists){
     *temp_ptr = pair[0];
     temp_ptr++;
    }
    if(!num_2_exists){
     *temp_ptr = pair[1];
    
     //print_countries(countries, n);
    
    } 
}
int astronaut_exists(int a, int b, int ** countries, int n){
    //printf("Running astronaut_exists\n");
    //int * temp_ptr = country;
    for(int i=0; i<n ; i++){
        int * temp_ptr = countries[i];
        int num_1_exists = 0;
        int num_2_exists = 0;
        while(*temp_ptr>0){
        if(a == *temp_ptr) {
            num_1_exists = 1;
        }
        if(b == *temp_ptr) {
            num_2_exists = 1;
        }
        temp_ptr++;
        }
        if(num_1_exists && num_2_exists){
            return 1;
        } 
    }
    
    return 0;
}

int exists_already_commit(int * pair, int ** countries, int n){
    //printf("Running exists_already_commit\n");
    for(int i=0; i<n; i++){
        if(no_from_pair_exists(pair, countries[i])){
            add_to_country(pair, countries[i], n);  
            //print_countries(countries, n);
            return 1;
        }
    }
    return 0;
}

void add_new_country(int * pair, int ** countries, int n){
    //printf("Running add_new_country\n");
    for(int i=0; i<n; i++){
        if(!country_exists(countries[i])){
            add_to_country(pair, countries[i], n); 
            //print_countries(countries, n);
            break;
        }
    }
}

int calculate_sets(int ** pairs, int ** countries, int n){
    //printf("Running calculate_sets\n");
    int sets=0;
    for(int i=1; i<=n; i++){
        for(int j=i+1; j<=n; j++){
            //printf("FOR NOS %d and %d\n", i, j);
            if(!astronaut_exists(i, j, countries, n)){
                
                //printf("NOS %d and %d are from different country.\n", i, j);
                sets++;
            }
        }
    }
    return sets;
}

int main()
{
    //printf("Running main\n");
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
    //print_countries(pairs, 2);
   
    /** Write code to compute answer using n,l,pairs**/
    int **countries = (int**)malloc(sizeof(int*)*n);
    for(int i=0; i<n; i++){
        countries[i] = (int*)calloc(n, sizeof(int));
    }
    //countries[0][0] = 0;
    //print_countries(countries, n);
    
    for(int i=0; i<l; i++){
      scanf("%d%d",&pairs[i][0],&pairs[i][1]);
      pairs[i][0]++;
      pairs[i][1]++;
      //printf("No 1 : %d, No 2: %d\n", pairs[i][0], pairs[i][1]);
      if(exists_already_commit(pairs[i], countries, n)){
          continue;
      }
      add_new_country(pairs[i], countries, n);
    }
    
    ans = calculate_sets(pairs, countries, n);
  
    printf("%lld\n",ans);
    return(0);
}
