import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { useAccountsController } from "./useAccountsController";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";
import { SliderNavigation } from "./SliderNavigation";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    areValuesVisible,
    toggleValueVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
    currentRevenue,
    currentExpenses,
  } = useAccountsController();
  const windowWidth = useWindowWidth();

  if (isLoading) {
    return (
      <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 lg:p-10 flex flex-col">
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
        </div>
      </div>
    );
  }

  const showContent = (name: string, createDescription: string, data: any) => {
    return (
      <div className="flex-1 flex flex-col justify-end mt-4 lg:mt-0">
        {data.length === 0 && (
          <>
            <div slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                {name}
              </strong>
            </div>

            <button
              className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col justify-center items-center gap-4 text-white hover:bg-teal-950/5 transition-colors"
              onClick={openNewAccountModal}
            >
              <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                <PlusIcon className="w-6 h-6" />
              </div>
              <span className="tracking-[-0.5px] font-medium w-32 text-center">
                {createDescription}
              </span>
            </button>
          </>
        )}

        {data.length > 0 && (
          <div className="mt-4">
            <Swiper
              spaceBetween={16}
              slidesPerView={windowWidth >= 500 ? 2.2 : 1.25}
              onSlideChange={(swiper) => {
                setSliderState({
                  isBeginning: swiper.isBeginning,
                  isEnd: swiper.isEnd,
                });
              }}
            >
              <div
                className="flex items-center justify-between mb-4"
                slot="container-start"
              >
                <strong className="text-white tracking-[-1px] text-lg font-bold">
                  {name}
                </strong>

                <SliderNavigation
                  isBeginning={sliderState.isBeginning}
                  isEnd={sliderState.isEnd}
                />
              </div>

              {accounts.map((account) => (
                <SwiperSlide key={account.id}>
                  <AccountCard data={account} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 lg:p-10 flex flex-col">
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo Total</span>

        <div className="flex items-center gap-2">
          <strong
            className={cn(
              "text-2xl tracking-[-1px] text-white",
              !areValuesVisible && "blur-md"
            )}
          >
            {formatCurrency(currentBalance)}
          </strong>

          <button
            className="w-8 h-8 flex items-center justify-center"
            onClick={toggleValueVisibility}
          >
            <EyeIcon open={!areValuesVisible} />
          </button>
        </div>
      </div>

      <div className="mb-6 mt-6 flex items-center gap-4">
        {/* Cards de Receitas e Despesas */}
        <div className="flex-1 flex gap-4">
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col">
            <p className="text-white text-sm tracking-[-0.5px]">
              Receitas no mês atual
            </p>
            <strong className="text-green-400 text-xl mt-1">
              {formatCurrency(currentRevenue)}
            </strong>
          </div>

          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col">
            <p className="text-white text-sm tracking-[-0.5px]">
              Despesas no mês atual
            </p>
            <strong className="text-red-400 text-xl mt-1">
              {formatCurrency(currentExpenses)}
            </strong>
          </div>
        </div>
      </div>

      {showContent("Meus cartões", "Cadastrar cartão", accounts)}
      {showContent("Minhas contas", "Criar nova conta", accounts)}
    </div>
  );
}
