package com.invtify.backend.service;

import com.invtify.backend.model.UserModel;
import com.invtify.backend.model.investment.InvestmentModel;
import com.invtify.backend.persistance.entity.Investment;
import com.invtify.backend.persistance.entity.User;
import com.invtify.backend.persistance.repository.InvestmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class InvestmentService {
    private final InvestmentRepository investmentRepository;
    private final UserService userService;

    public Collection<InvestmentModel> getInvestments(String userId) {
        UserModel user = userService.getUserModel(userId);
        return user.getInvestments();
    }

    public void setInvestment(String userId, InvestmentModel investmentModel) {
        User user = userService.getUser(userId);
        Investment investment = user.getInvestments().stream()
                .filter(currentInvestment -> currentInvestment.getId() == investmentModel.getUniqueId())
                .findAny().orElse(null);
        if (investment != null) {
            editInvestment(user, investment, investmentModel);
        } else {
            createInvestment(user, investmentModel);
        }
    }

    public void createInvestment(User user, InvestmentModel investmentModel) {
        Investment investment = new Investment();
        editInvestment(user, investment, investmentModel);
    }

    public void editInvestment(User user, Investment investment, InvestmentModel investmentModel) {
        investment.setUser(user);
        investment.setId(investmentModel.getUniqueId());
        investment.setAsset(investmentModel.getAsset());
        investment.setStrategy(investmentModel.getStrategy());
        investment.setFrequencyType(investmentModel.getFrequency().type());
        investment.setFrequencyDay(investmentModel.getFrequency().day());
        investment.setFrequencyHour(investmentModel.getFrequency().hour());
        investment.setAmount(investment.getAmount());
        investmentRepository.save(user);
    }
}
