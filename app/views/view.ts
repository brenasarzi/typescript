export abstract class View <T>{
    // protected - apenas as classes filhas podem acessar essa propriedade.
    protected elemento: HTMLElement
    private escapar: boolean = false

    constructor(seletor: string, escapar?: boolean){
        const elemento = document.querySelector(seletor)
        if(elemento){
            this.elemento = elemento as HTMLElement
        } else{
            throw Error(`Elemento ${seletor} não existe no DOM. Verifique!`)
        }
        if(escapar){
            this.escapar = escapar
        }
    }

    public update(model: T): void{
        let template = this.template(model)
        if(this.escapar){
            template = template.replace(/<script>[\s\S]*?<\/script>/, '')
        }
        this.elemento.innerHTML = template
    }

    protected abstract template(model: T): string
}